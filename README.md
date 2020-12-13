# Préambule

Dans le cadre de notre projet en programmation web Avancée pour l’année 2020-2021, nous avons développé un TodoList en utilisant le Framework Angular. Cette Application permet aux utilisateurs d’écrire et de consulter, de modifier ou de supprimer des articles. ces articles ou TodoItem sont enregistrer ou recuperer depuis localStorage ou firebase. Bien entendu un utilisateur peut utiliser des filtres pour gerer ses articles.

# Installation du projet
 Télécharger ou cloner le projet
Se rendre directement sur https://github.com/madhouny/Angular-TodoList, puis choisir la branche Master. Deux possibilités s’offrent à nous le téléchargement ou le clonage. Pour le clonage il suffit d’utiliser la commande : git clone https://github.com/madhouny/Angular-TodoList.git

# Se rendre dans le dossier de l’application
Utiliser la commande : cd Angular-TodoList

# Installation et  Structure des components
- pour creer les deux components, j ai utilisé la commande suivante : ng g c components/TodoList,  ng g c components/TodoItem, 
- Le dossier Components se compose de deux components : TodoList  c'est le parents et TodoItem (le fils),
- Input Binding pour transmettre des données d'un parent à un enfant en utilisant des decorateurs @Input, @Output decorators.
- Nous examinons également les événements pour informer les composants parents de quelque chose qui s'est passé chez l'enfant.

# Interface Todo 
- la commande utilisé pour generer cette interface est la suivante : ng g interface interfaces/Todo 
- Cette interface permet de definir la structure d'une tache. 
- Chaque article est defini par son id, titre, et deux variable  boolean : editing et compeleted

# CRUD des Taches : 
  # A - Ajout
1- L'ajout des articles : pour faire passer les données, j ai utilisé Two Way Data Binding avec le [(ngModel)]
2- Ajouter un évenement pour ajouter une tache  on apuyant sur Enter avec (keyup.enter)="addTodo()"
  
  # B -  Suppression
1- en utilisant la fonction Filtre() pour supprimer l'id des articles
  
  # C - Modification
1- un double-clic pour éditer une tache, (dblclick) = "editTodo (todo)"
2- pour afficher la bonne Input, <ng-template #editingTodo> </ng-template>
3- Pour prendre en compte la nouvelle modification, j ai utilisé l'événement Blur ou keyup.enter (blur) = "doneEdit (todo)" (keyup.enter) = "doneEdit (todo)"
4- annuler la modification en utilisant un événement cancelEdit lorsque nous cliquons sur echap (keyup.esc) = "cancelEdit (todo)"

# Filtres 
- Les filtres permettent de filtrer les articles en fonction de trois critéres :All, Active , Completed
- rendre la classe active  lorsque le filtre est selectionné

# tâches terminées et mise à jour du nombre d'éléments restants
- Cette fonctionnalité permet d'identifier les taches terminés et afficher le nombres des elements restants
- afficher le bouton Effacer  si seulement un seul élément est terminé : fonction atLeastOneItemCompleted ()
- Faire disparaitre le bouton Effacer lorsque on  décoche tous les éléments, clearCompleted ()
- Bouton  checkAll permet de cocher toutes la taches en une seule fois: checkAllTodos ()

# Services 
- Les services contiennent toutes les fonctionnalités et leurs implémentation pour les injecter ensuite dans les components. 
- La commande pour créer un service : ng g service services/Todo
- Les services sont appelés dans le constructeur de chaque compoenents. 

# Web Animations
Le système d'animation d'Angular repose sur la fonctionnalité CSS, ce qui signifie que vous pouvez animer n'importe quelle propriété que le navigateur considère comme animable. Cela inclut les positions, les tailles, les transformations, les couleurs, les bordures, etc.

- Des Animations ont été ajouter de type Transition lors de l'ajout, la suppression et l'affichage des taches.
- la commande pour installer les animations : npm install --save web-animations-js

# Firebase fontionnalité
Firebase est un ensemble de services d'hébergement pour n'importe quel type d'application (Android, iOS, Javascript, Node.js, Java, Unity, PHP, C++ ...). Il propose d'héberger en NoSQL et en temps réel des bases de données, du contenu, de l'authentification sociale (Google, Facebook, Twitter et Github), et des notifications, ou encore des services, tel que par exemple un serveur de communication temps réel.

- Pour Procéder a utiliser Firebase :
 a- npm install --save firebase angularfire2
 b- créer un projet  Firebase Console et Configurer Firestore l'endroit où les taches sont sauvegarder et récuperer.
 c- ajouter la configuration Firebase de l'application Web à notre projet, dans le dossier Environnement, A Coller dans le fichier envirnnement.ts : 
 
  export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyDUxJdt9rmAzLKRmdSt-2LaSRHWOgXaLhY",
    authDomain: "messengerandroid-61f29.firebaseapp.com",
    databaseURL: "https://messengerandroid-61f29.firebaseio.com",
    projectId: "messengerandroid-61f29",
    storageBucket: "messengerandroid-61f29.appspot.com",
    messagingSenderId: "1041781458335",
    appId: "1:1041781458335:web:24b3ee6ab89d9a3b5129aa"
  }
};

d- Importer ces trois modules dans le fichier App.Module.ts : 
    import { environment } from '../environments/environment';
    import { AngularFireModule } from 'angularfire2';
    import { AngularFirestoreModule } from 'angularfire2/firestore';  

Aprés avoir faire tout les étapes ci dessus, il faut injecter dans le Constructeur de Service l'instance de type Firestore:  public afs: AngularFirestore 
pour ensuite intéragir avec Les Collections de Firestore depuis notre projet.

# LocalStorage fonctionnalité
Dans un deuxieme temps, La version Final de notre  Projet va dependre de cette fonctionnalité au lieu de Firebase.
Pour Sauvegarder nos données localement, voici les petits bout de code à insérer dans les différent fonctions du CRUD : 
 - localStorage.setItem('todos', JSON.stringify(this.todos)); => lors de l'ajout et la modification
 - JSON.parse(localStorage.getItem('todos')|| '{}'); => lors de la récuperation des taches depuis le constructeur de Service.

