""" Palettes Data Models """


from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    """ Users """

    image = models.ImageField(
        null=True,
        blank=True,
        help_text='Your profile picture'
    )
    bio = models.CharField(
        max_length=256,
        null=True,
        blank=True,
        help_text='Tell us about your self'
    )
    likes = models.ManyToManyField(
        'Palette',
        related_name='likes'
    )
    favorites = models.ManyToManyField(
        'Palette',
        related_name='favorites'
    )
    saves = models.ManyToManyField(
        'Palette',
        related_name='saves'
    )


class Palette(models.Model):
    """ Color palettes """

    # The owner of the palette
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )
    name = models.CharField(
        max_length=32,
        help_text='Palette name'
    )
    colors = models.ManyToManyField(
        'Color'
    )
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Color(models.Model):
    """ Colors """

    name = models.CharField(
        max_length=32,
        help_text='Color name'
    )
    value = models.CharField(
        max_length=9,
        help_text='Color value'
    )
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
