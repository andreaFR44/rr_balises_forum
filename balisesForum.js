// ==UserScript==
// @name        Nouvelles balises (forum RR)
// @namespace   RR_OrandinJS
// @author      Orandin
// @include     http://forum.lesroyaumes.com/posting.php
// @include     http://forum.lesroyaumes.com/posting.php*
// @include     http://forum2.lesroyaumes.com/posting.php
// @include     http://forum2.lesroyaumes.com/posting.php*
// @version     1
// @grant       none
// ==/UserScript==

var RR_OrandinJS = {

    /**
     * Sélecteur DOM pour accéder à la zone où sera ajouté les différentes balises
     * @type String
     */
    TagSelector: ".helpline",

    /**
     * Sélecteur DOM pour récupérer la zone d'aide textuelle
     * @type String
     */
    HelpLineSelector: ".helpline",

    /**
     * Sélecteur DOM pour récupérer le textarea
     * @type String
     */
    TextAreaSelector : "textarea.post",

    /**
     * Tableau contenant les définitions de chaque balise
     * @type Array
     */
    tags : [ 
        { 
            name: 'strike',
            help: 'Texte barré: [strike]texte[/strike]',
            type: 'image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJRJREFUeNpi/P//PwMlgImBQjDwBrCgC1y4cOH/nj17sCp2cXFhMDAwYMTrgu3btzP8/v0brBhEI7NBcgS98OvXL4bKykpGkE0gNgiD2CAxEBsdMOKLRqAmsGR7ezsjLjUYBkRGRuJNGMuXL2ck2gXp6elgyZkzZzISHQvI4MePHwSjEacL0L2C7nSivDBC8gJAgAEAXzRNTTA6fBkAAAAASUVORK5CYII='
        },
        {
            name: 'center',
            help: 'Texte centré: [center]texte à centrer[/center]',
            type: 'image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAHBJREFUeNpi/P//PwMlgImBQkCxASwwxqJFi0jyS1xcHCOIZqQ0DFiQOXPmzCHKtJSUFEYYm3oumDRpEkkm5eXl0SAMYKC9vR2rqZWVlYzoYtRzQW1tLUkmNTc30yAMSktLiTKtu7ubeumA4swEEGAAVJAtETmH0P0AAAAASUVORK5CYII='
        },
        {
            name: 'right',
            help: 'Texté aligné à droite: [right]texte à aligner[/center]',
            type: 'image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGtJREFUeNpi/P//PwMlgImBQkCxASzInEWLFhHtn7i4OEYQzUhpGLBgE5wzZw5BU1NSUmjggkmTJhFtWl5eHg3DAATa29vxmlxZWUllF9TW1pJkUnNzM43CoLS0lCgTu7u7qeMCijMTQIABAPdtLRGJ1m+2AAAAAElFTkSuQmCC'
        },
        {
            name: 'spoiler',
            help: 'Texte à cacher: [spoiler]Texte caché[/spoiler]',
            type: 'button',
            text: 'Spoiler'
        },
        {
            name: 'sup',
            help: 'Texte à mettre en exposant: [sub]Exposant[/sub]',
            type: 'image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3wYJDQY0osJ+EAAAAJ9JREFUOMvtULENAyEMtKNfyDvQsAEVK9AiKnq2oGIDGnZgHJAbUuXFK//6T6KkylW2z3cnG+DXCCGMEML42Mh7/76JMWYV40zUWkcpZVckhAAiQq31Ko4x4jIv5ZwBAEBK+VQ/+hjjJvQ2N8wMzjkkImRmYGYgInTOITO/dqe1dlhrTx+1HBGttUtB3zPovV8ywL2hUmpze0oJ4Y9D3AHqy0KPFDjHLAAAAABJRU5ErkJggg=='
        },
        {
            name: 'sub',
            help: 'Texte à mettre en indice: [sup]Indice[/sup]',
            type: 'image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALBJREFUeNpi/P//PwMlgImBQjDwBrAgcy5cuPB/z549WBW6uLgwGBgYMOJ1wfbt2xl+//4NVgyikdkgOYJe+PXrF0NlZSUjyCYQG4RBbJAYiI0NMOKKRqAmsER7ezsj0WGADL5//056IFLVgB8/fqDwe3p6wF4qKSlhJBgGkZGRKILLly+Ha2psbPxfX1+PMARkALE4Pz//P7oYI7GZKT4+Hq5w4cKFjASjkW55ASDAANTXgzzSSVwAAAAAAElFTkSuQmCC'
        },
        {
            name: 'char',
            help: 'Insérer la fiche d\'un joueur: [char]Nom IG[/char]',
            type: 'image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAWCAYAAAAinad/AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNXG14zYAAAAWdEVYdENyZWF0aW9uIFRpbWUAMDEvMTcvMTOYD50mAAADiElEQVQ4jc2Vy09UdxTHP3Pv79474ADDMJ0hvMTKQ3k4ojwqKqbRpjTYNG1YdNeEBX2wsOGPaCJNG1k0cUPSEmtiQ1M7NjFUaoaqUGop0aIUDC0FVMDMjDAwjzv3znSBQEeJKxc9y/PL+Zzz/Z6T/CzJZJIXFdILIwECoPM1T1Jkp5MhFAD8pkz3Nz4aD1UjC5lYKEQ0HKPKCTmq/VmIkPj8yi2L2Eh4anfjcGYSCq3x7eAMbrcDe3YmIyPjBIMhysuLCNhclO3N4yWbiqKaqIqCy53NbwPjW5MBCEkgFEH/4D0ePIrg8ZRxyfsZuh7nl5Fxzp/vx+cbZeDqKAUFLuoOlNJQXUieIrYm/O+4ihD4RibQsuwcO/YqAKqq0HS0hqajNQAsLPi5cOEK585dpu+7a1z9+uNUmGEksKYJlpb8AExOztLScoT6hg7eefsIJ0++QlXVLgByc3M4depdlpdXMU0TVd3aobRhIEBWZhp7KsuQJAs1+8u4cb2bkpJ8enou8+FH3Vy8eINgMASAb/B39pTmowqBVVW3YIaRQCgyOQ47NptGQYELVVVQFEFraxNdXe10dLzFP7OLnD37AwDT0/OUFLuwSNt4ZpVlrJqCHjcpL9+ZsnpFEVRVFlNVWQzA4mIAv3+ZfSVuNMWyvUyAe3895HCjB4D6hg6+/KqfcDiaAvf5RtH1OK4M0DSRCjOMBJoiuHX7b+5OzND8xiEArl87Q8Af4v0PztDb+yMLCwEABn66SUNdBXrcQIinYBsxNh1Akizs95QB62fR2dnKp13tGEYCr3cYgJu/3qEo34mqCISQSahyKiwWN3gQiOB02pFlKUVibq6DtrZm2ttbAJi/v0Rejg0zue6XpJupsNWojj+4RsnugudKnJqaJRQKs3eXHSEUotHY9jLvP3zE8RP1z5Xo9f5MZuYO3I4daGk2YjFjs37TvWjE4M7dGR73fM/Q0G3q6io4cbyO2toK2tqaNwuGhv+g/mA5qiJYW11BTmrPwoyEwRefvMf0XJCpmSUueQc5fbqX9HQNl8tBaWkhhxs9jI1N8ubrB5FkGSMeR49LRHX9KZhpkpul4Uy3c6A4g3A0n0ikmmVDsPg4wvzCMn19A8zNLbLTncHKSgirVSP6xPwU2J/D05hWGTm6/riaWO8We9L15aRCYZGNpqJ9zI5NEJBUktb1k9CDYQAs/9s/4F+GKFp2veOTuQAAAABJRU5ErkJggg=='
        }
    ],

    /**
     * Tableau contenant les définitions de chaque balise orpheline
     * @type Array
     */
    OrphanTags : [
        {
            name: 'hr',
            help: 'Barre pleine de séparation: [ħr] ou [hr={Nombre compris entre 1 et 99}]',
            type: 'image',
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIBJREFUeNpi/P//PwMlgImBQjDwBrDAGIsWLSIpMOLi4hhBNCOlgQh3wYQJE0gyqaCggIouaFkdxfD1nDxBk7iNHjIi82tClyG8gC5JajROA+L/JOJpcC+8ev4iM9wllCSbV+5ZnQmkssAGPLrzYHr3ne5MEl0/nSqxMPB5ASDAABxrNniWMCq/AAAAAElFTkSuQmCC'
        },
        {
            name: 'hr-dashed',
            help: 'Barre non pleine de séparation: [hr-dashed] ou [hr-dashed={Nombre compris entre 1 et 99}]',
            type: 'button',
            text: 'hr-dashed'
        },
        {
            name: 'hr-dotted',
            help: "Barre en pointillés de séparation : [hr-dotted] ou [hr-dotted={Nombre compris entre 1 et 99}]",
            type: 'button',
            text: 'hr-dotted'
        }
    ],


    /**
     * Constructeur
     */
    init: function() {
        var tr       = document.createElement("tr");
        var tagsMenu = document.querySelector(this.TagSelector);
        tagsMenu     = tagsMenu.parentNode.parentNode.parentNode.previousElementSibling;
        tagsMenu.parentNode.insertBefore(tr, tagsMenu);

        for (var i in this.tags)
            this.createInput(this.tags[i], tr);
        
        for (var i in this.OrphanTags)
            this.createInput(this.OrphanTags[i], tr);
    },

    /**
     * Méthode de création des input
     * @param  object  tag      Objet contenant la définition du tag
     * @param  object  tagsMenu Noeud dans lequel doit être inséré les éléments que l'on crée
     * @return void
     */
    createInput : function(tag, tagsMenu) {
        var td         = document.createElement("td");
        td.style        = "text-align: center;";       
        var span       = document.createElement("span");
        span.className = "genmed";

        var input       = document.createElement("input");
        input.className = "button";
        input.type      = tag.type;

        switch(tag.type) {
            case 'image':
                input.src = tag.src;
                input.alt = tag.name;
                input.style = "padding: 0 7px; border-style: outset; border-width: 2px;";
                break;
            case 'button':
                input.value = tag.text;
                break;
            default:
                input.value = tag.name;
        }

        input.onclick     = function() { RR_OrandinJS.insertTag(tag); return false;  };
        input.onmouseover = function() { RR_OrandinJS.TagHelper(tag); };

        span.appendChild(input);
        td.appendChild(span);
        tagsMenu.appendChild(td); 
    },

    /**
     * Méthode d'insertion de balises
     * @param  objet  tag      Objet contenant la définition du tag
     * @return void
     */
    insertTag : function(tag) {
        var startTag = "", endTag = "";
        var field    = document.querySelector(this.TextAreaSelector); 
        var scroll   = field.scrollTop;
        field.focus();
        
        // Récupération de la sélection
        if (window.ActiveXObject) {
                var textRange = document.selection.createRange();            
                var currentSelection = textRange.text;
        } else {
                var startSelection   = field.value.substring(0, field.selectionStart);
                var currentSelection = field.value.substring(field.selectionStart, field.selectionEnd);
                var endSelection     = field.value.substring(field.selectionEnd);               
        }
        
        if (this.OrphanTags.indexOf(tag) >= 0) {
            if (confirm("Voulez-vous définir la largueur ?")) {
                var texte = "Largeur du trait de séparation ? \n (De 1 à 99)";
                var taille = parseInt(prompt(texte));
                while(taille < 0 && 99 < taille) {
                console.log(taille);
                    alert('Attention! Vous devez renseigner un nombre compris entre 1 à 99.');
                    var taille = parseInt(prompt(texte));
                }

                startTag = "["+ tag.name +"="+ taille +"]";
            } else {
                startTag = "["+ tag.name + "]";
            }
        } else {
            startTag = "["+ tag.name +"]";
            endTag = "[/"+ tag.name +"]"
        }
        
        // Insertion des balises
        if (window.ActiveXObject) {
                textRange.text = startTag + currentSelection + endTag;
                textRange.moveStart("character", -endTag.length - currentSelection.length);
                textRange.moveEnd("character", -endTag.length);
                textRange.select();     
        } else {
                field.value = startSelection + startTag + currentSelection + endTag + endSelection;
                field.focus();
                field.setSelectionRange(startSelection.length + startTag.length, startSelection.length + startTag.length + currentSelection.length);
        } 

        field.scrollTop = scroll;
    },

    /**
     * Méthode pour afficher l'aide textuel au survol de l'input
     * @param object tag Objet contenant la définition de la balise
     * @return void
     */
    TagHelper: function(tag) {
        var helpline = document.querySelector(this.HelpLineSelector);
        helpline.value = tag.help;
    }
}

RR_OrandinJS.init();