# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-20 08:38
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('usuario_modulo', '0007_modulo_template_html'),
    ]

    operations = [
        migrations.AlterField(
            model_name='modulo',
            name='proyectosistema',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='proyectos.ProyectoSistema'),
        ),
    ]
