from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    # Honeypot: a real visitor never sees or fills this field (hidden via CSS
    # on the frontend). A filled-in value means a bot filled every field it
    # could find. Not saved — just used to quietly drop spam in the view.
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message', 'website']

    def validate_name(self, value: str) -> str:
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError('Name looks too short.')
        return value

    def validate_message(self, value: str) -> str:
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError('Message is too short — give me a bit more to go on.')
        return value

    def is_spam(self) -> bool:
        """Call after is_valid(). True if the honeypot field was filled in."""
        return bool(self.validated_data.get('website'))

    def create(self, validated_data):
        validated_data.pop('website', None)
        return ContactMessage.objects.create(**validated_data)
