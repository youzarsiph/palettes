""" Serializers """


from rest_framework import serializers
from palettes.models import User, Palette, Color


# Create your serializers here
class UserSerializer(serializers.HyperlinkedModelSerializer):
    """ User serialization """

    palettes = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='palette-detail',
        read_only=True
    )

    class Meta:
        """ Meta data """

        model = User
        fields = [
            'id',
            'url',
            'username',
            'first_name',
            'last_name',
            'email',
            'date_joined',
            'last_login',
            'palettes'
        ]


class PaletteSerializer(serializers.HyperlinkedModelSerializer):
    """ Palette serialization """

    # The owner of the palette
    user = serializers.ReadOnlyField(source='user.username')
    # Colors of the palette
    colors = serializers.HyperlinkedRelatedField(
        many=True,
        view_name='color-detail',
        read_only=True,
    )

    class Meta:
        """ Meta data """

        model = Palette
        fields = [
            'user',
            'id',
            'url',
            'name',
            'colors',
            'created_at',
            'updated_at'
        ]


class ColorSerializer(serializers.HyperlinkedModelSerializer):
    """ Color serialization """

    palette = serializers.ReadOnlyField(source='palette.name')

    class Meta:
        """ Meta data """

        model = Color
        fields = [
            'palette',
            'id',
            'url',
            'name',
            'value',
            'created_at',
            'updated_at'
        ]
