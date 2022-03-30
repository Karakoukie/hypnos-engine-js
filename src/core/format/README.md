Cette partie permet d'utiliser le format hypnos :

```
resources : id type content (évite les doublons)

nodes : id resource_id position rotation scale
```

Exemple :

```hypnos
0zd565qz image "imagestockéeauformatbinaire"
di84fqz5 mesh "meshstockéenbinaire"
84d4zqd5 color #444444
5zqd84gz color #666666
4zd8f5qz renderer 84d4zqd5 0zd565qz di84fqz5
8zd4654d renderer 5zqd84gz 0zd565qz di84fqz5 (rendereur avec une couleur différente)

8zd5sdf5 4zd8f5qz 0 0 0 0 0 0 0 1 1 1 (renderer placé au centre)
```

Le changement de fichier hypnos permet de ne charger que les nouvelles resources et ne décharger que celles qui ne sont plus utilisées.