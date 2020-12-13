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
  # Ajout
1- L'ajout des articles : pour faire passer les données, j ai utilisé Two Way Data Binding avec le [(ngModel)]
2- Ajouter un évenement pour ajouter une tache  on apuyant sur Enter avec (keyup.enter)="addTodo()"
  
  # Suppression
1- en utilisant la fonction Filtre() pour supprimer l'id des articles
  
  # Modification
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
