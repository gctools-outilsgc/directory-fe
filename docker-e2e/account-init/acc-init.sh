
python manage.py constance set RECAPTCHA_ENABLED false

python manage.py constance set SERVICE_MESH_ACTIVATION true
python manage.py constance set SERVICE_MESH_USER "rebbit"
python manage.py constance set SERVICE_MESH_PASSWORD "rebbit"
python manage.py constance set SERVICE_MESH_HOST "rabbitMQ"

python manage.py creatersakey

python manage.py shell << EOF
from core.models import User; 
User.objects.create_superuser('admin', 'admin', 'adminpass')
EOF

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
c = Client(name='directory', client_type='public', client_id='3', website_url='http://localhost:8008', scope='openid modify_profile email profile', redirect_uris=['http://localhost:8008/#!callback', 'http://localhost:8008/#!silent'], post_logout_redirect_uris=['http://localhost:8008/#!logout'])
c.save()
c.response_types.add(ResponseType.objects.get(value='id_token token'))
EOF


apk add curl
curl -XPUT -H "Content-type: application/json" -d '{
  "mappings": {
    "properties": {
      "email": {
        "type": "text"
      },
      "gcID": {
        "type": "keyword"
      },
      "mobilePhone": {
        "type": "text"
      },
      "suggest":{
        "type":"completion"
      },
      "name": {
        "type": "text",
        "fields":{
          "keyword":{
            "type":"keyword"
          }
        }
      },
      "avatar":{
        "type":"text"
      },
      "officePhone": {
        "type": "text"
      },
      "team": {
        "properties": {
          "nameEn": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "nameFr": {
            "type": "text",
            "fields": {
              "keyword": {
                "type": "keyword",
                "ignore_above": 256
              }
            }
          },
          "organization": {
            "properties": {
              "acronymEn": {
                "type": "text",
                "fields": {
                  "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                  }
                }
              },
              "acronymFr": {
                "type": "text",
                "fields": {
                  "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                  }
                }
              },
              "nameEn": {
                "type": "text",
                "fields": {
                  "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                  }
                }
              },
              "nameFr": {
                "type": "text",
                "fields": {
                  "keyword": {
                    "type": "keyword",
                    "ignore_above": 256
                  }
                }
              }
            }
          }
        }
      },
      "titleEn": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "titleFr": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      }
    }
  }
}' 'http://es:9200/profiles'


python manage.py shell << EOF
from core.models import User;
from django.core import signing
user = User.objects.create_user('user@gccollab.ca', 'user', 'pass')
user.activate_user(signing.dumps(obj=user.email))
EOF
sleep 6
python manage.py shell << EOF
from core.models import User;
from django.core import signing
user = User.objects.create_user('user2@gccollab.ca', 'user2', 'pass')
user.activate_user(signing.dumps(obj=user.email))
EOF
python manage.py shell << EOF
from core.models import User;
from django.core import signing
user = User.objects.create_user('user3@gccollab.ca', 'user3', 'pass')
user.activate_user(signing.dumps(obj=user.email))
EOF