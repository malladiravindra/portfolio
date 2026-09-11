import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)


def _client_ip(request) -> str | None:
    forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if forwarded:
        return forwarded.split(',')[0].strip()
    return request.META.get('REMOTE_ADDR')


class ContactMessageView(APIView):
    """POST /api/contact/ — the portfolio site's contact form endpoint."""

    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def post(self, request, *args, **kwargs):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        if serializer.is_spam():
            # Pretend it worked so the bot doesn't learn anything — just
            # don't save it or send an email.
            logger.info('Dropped a contact submission with a filled honeypot field.')
            return Response({'detail': 'Thanks — message sent.'}, status=status.HTTP_201_CREATED)

        contact_message = serializer.save(ip_address=_client_ip(request))
        self._notify(contact_message)

        return Response({'detail': 'Thanks — message sent.'}, status=status.HTTP_201_CREATED)

    def _notify(self, contact_message) -> None:
        subject = f'Portfolio contact form: {contact_message.subject or "New message"}'
        body = (
            f'From: {contact_message.name} <{contact_message.email}>\n'
            f'Submitted: {contact_message.created_at}\n\n'
            f'{contact_message.message}'
        )
        try:
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.CONTACT_RECIPIENT_EMAIL],
                fail_silently=False,
            )
        except Exception:
            # The submission is already saved in the database at this point —
            # a flaky SMTP connection shouldn't turn into a 500 for the
            # visitor. Log it so it's not silently lost.
            logger.exception('Failed to send contact-form notification email for message id=%s', contact_message.pk)
