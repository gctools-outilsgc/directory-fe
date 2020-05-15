
python manage.py constance set RECAPTCHA_ENABLED false

python manage.py constance set SERVICE_MESH_ACTIVATION true
python manage.py constance set SERVICE_MESH_USER "rebbit"
python manage.py constance set SERVICE_MESH_PASSWORD "rebbit"
python manage.py constance set SERVICE_MESH_HOST "rabbitMQ"

python manage.py creatersakey

python manage.py shell << EOF
from oidc_provider.models import Client, ResponseType
c = Client(name='profile', client_type='confidential', client_id='1', client_secret='123', redirect_uris=['http://profile_apollo:4000/'])
c.save()
c.response_types.add(ResponseType.objects.get(value='code'))
EOF

python manage.py shell << EOF
from oidc_provider.models import Client, ResponseType
c = Client(name='notifications', client_type='confidential', client_id='2', client_secret='456', redirect_uris=['http://notification_apollo:4000/'])
c.save()
c.response_types.add(ResponseType.objects.get(value='code'))
EOF

python manage.py shell << EOF
from oidc_provider.models import Client, ResponseType
c = Client(name='directory', client_type='public', client_id='3', redirect_uris=['http://localhost:8008/'])
c.save()
c.response_types.add(ResponseType.objects.get(value='code'))
EOF

