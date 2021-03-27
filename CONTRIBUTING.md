# Contribuer

## Prérequis

Pour contribuer au projet, vous aurez besoin des outils suivants :

- Node.JS >= 14.16
- PNPM ou NPM
- Git flow


## Installation

Premièrement, forkez et clonez le dépôt. Après cela, l'environnement devra être préparé :

```sh
# Récupération de toutes les branches
$ git branch -a
```

Pour l'installation des dépendances, suivez ces [indications](./README.md#dépendances).

## Démarrer une branche de fonctionnalités

Pour démarrer une nouvelle fonctionnalité, créez une nouvelle branche :

```sh
$ git flow feature start votre_branche
```

Son nom doit être clair et on doit tout de suite comprendre à quoi elle est reliée en le lisant.

Lorsque vous aurez fini, publiez la branche et faites une demande de fusion manuellement :

```sh
$ git flow feature publish votre_branche
```

Des tests et des relectures du code seront effectuées afin de vérifier que la branche soit apte à être fusionnée avec la branche principale.
