""" Views """


from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from palettes.models import User, Palette, Color
from palettes.permissions import IsOwnerOrReadOnly, IsUserOrReadOnly
from palettes.serializers import UserSerializer, PaletteSerializer, ColorSerializer


class UserViewSet(viewsets.ModelViewSet):
    """ Create, Retrieve, Update and Destroy Users """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsUserOrReadOnly]


class PaletteViewSet(viewsets.ModelViewSet):
    """ Create, Retrieve, Update and Destroy Palettes """

    queryset = Palette.objects.all()
    serializer_class = PaletteSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_create(self, serializer):
        """ Set the owner of the palette """

        serializer.save(user=self.request.user)


class ColorViewSet(viewsets.ModelViewSet):
    """ Create, Retrieve, Update and Destroy Colors """

    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
