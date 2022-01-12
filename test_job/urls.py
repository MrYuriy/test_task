from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from rest_framework import routers

from backend import views


router = routers.DefaultRouter()
router.register(r'aparts', views.ApartmentsView, 'aparts')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("", views.index, name="index")
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
