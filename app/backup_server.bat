@ECHO OFF
start cmd.exe /C "python manage.py dumpdata > db_backup.json"