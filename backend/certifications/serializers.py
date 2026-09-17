from rest_framework import serializers

from .models import Certification


class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = [
            'title', 'issuing_organization', 'issue_date',
            'credential_id', 'credential_url', 'description',
        ]
