ng-multi-select
===================

A custom multi select type ahead drop down list directive for AngularJS.

This directive allows to select multiple item from dropdown list. It has in built functionality to query local and remote dataset. 
It also allows to create list of values dynamically. By default it will display dropdown as list of span element with text. You have option to customize list item by using ta-item-template.

# Demo

View the demo on Plunker: http://plnkr.co/edit/7LHuN1t5eHe9iNyTw7MV?p=preview

# Installation

### Bower
```bash
$ bower install ng-multi-select
```

### Manual
```bash
1. $ git clone https://github.com/shalotelli/ng-multi-select.git
2. <script src="path/to/shalotelli-angular-multiselect/multiselect.js">
3. <link rel="stylesheet" href="path/to/shalotelli-angular-multiselect/styles/multi-select.css">
4. Add module shalotelli-angular-multiselect to dependencies list
```

# Usage

To use this directive, call the multi-select tag, including the model with the array of data objects, a reference to the output model and any display options (listed below).

To prepopulate items, add them to model.

```html
<ta-drop-down
        ta-items="values"
        ta-label="Item"
        ta-default-items="values"
        ta-name="itemName"
        search = "searchItem(term)"
        select-items="selected"
>
</multi-select>
```
