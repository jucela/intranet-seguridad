# -*- coding: utf-8 -*-
# Generated by Django 1.10.4 on 2017-01-19 23:28
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sistemas', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProyectosSiga',
            fields=[
                ('id', models.IntegerField(db_column='id', primary_key=True, serialize=False)),
                ('annio_meta', models.CharField(blank=True, db_column='annio_meta', max_length=4, null=True)),
                ('codi_meta', models.CharField(blank=True, db_column='codi_meta', max_length=4, null=True)),
                ('cod_proyecto', models.CharField(blank=True, db_column='cod_proyecto', max_length=4, null=True)),
                ('desc_proyecto', models.CharField(blank=True, db_column='desc_proyecto', max_length=255, null=True)),
                ('CODI_DEPE_TDE', models.CharField(blank=True, db_column='CODI_DEPE_TDE', max_length=4, null=True)),
                ('codi_depe_apro', models.CharField(blank=True, db_column='codi_depe_apro', max_length=4, null=True)),
                ('sigla', models.CharField(blank=True, db_column='sigla', max_length=50, null=True)),
            ],
            options={
                'db_table': 'V_PROYECTOS_SIGA',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_siga', models.IntegerField()),
                ('nombre', models.CharField(max_length=100)),
                ('sigla', models.CharField(blank=True, max_length=50, null=True)),
                ('anio', models.IntegerField()),
                ('descripcion', models.TextField(blank=True, null=True)),
                ('fecha_inicio', models.DateField(blank=True, null=True)),
                ('fecha_fin', models.DateField(blank=True, null=True)),
                ('cod_meta', models.CharField(max_length=8)),
                ('estado', models.IntegerField(default=1)),
                ('usr_creacion', models.CharField(blank=True, max_length=100, null=True)),
                ('fec_creacion', models.DateTimeField(blank=True, null=True)),
                ('usr_edicion', models.CharField(blank=True, max_length=100, null=True)),
                ('fec_edicion', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'PROYECTO',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='ProyectoSistema',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usr_creacion', models.CharField(blank=True, max_length=100, null=True)),
                ('fec_creacion', models.DateTimeField(blank=True, null=True)),
                ('usr_edicion', models.CharField(blank=True, max_length=100, null=True)),
                ('fec_edicion', models.DateTimeField(blank=True, null=True)),
                ('proyectos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='proyectos.Proyecto')),
                ('sistemas', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sistemas.Sistema')),
            ],
            options={
                'db_table': 'PROYECTO_SISTEMA',
                'managed': True,
            },
        ),
        migrations.AddField(
            model_name='proyecto',
            name='sistemas',
            field=models.ManyToManyField(through='proyectos.ProyectoSistema', to='sistemas.Sistema'),
        ),
        migrations.AlterUniqueTogether(
            name='proyectosistema',
            unique_together=set([('proyectos', 'sistemas')]),
        ),
        migrations.AlterUniqueTogether(
            name='proyecto',
            unique_together=set([('id_siga',)]),
        ),
    ]
