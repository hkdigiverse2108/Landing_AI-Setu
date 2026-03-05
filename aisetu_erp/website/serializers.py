from rest_framework import serializers
from .models import PricingSignup,DemoRequest
from .models import Policy
from rest_framework.exceptions import ValidationError
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class DemoRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoRequest
        fields = '__all__'

class PricingSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = PricingSignup
        fields = '__all__'

class PolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = Policy
        fields = ['id', 'title', 'content', 'last_updated']

User = get_user_model()

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist")

        # Map email to username for SimpleJWT
        attrs['username'] = user.username
        attrs['password'] = password

        data = super().validate(attrs)
        # Add extra info if needed
        data['role'] = 'admin' if user.is_staff else 'user'
        return data
    
User = get_user_model()

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # use email instead of username

    def validate(self, attrs):
        email = attrs.get("email")
        password = attrs.get("password")

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("No user with this email")

        if not user.check_password(password):
            raise serializers.ValidationError("Incorrect password")

        return super().validate({'username': user.username, 'password': password})