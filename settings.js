var settings =  {"rp_scroll": true, "rp_preimg": true};

if (!localStorage.getItem("ripando_plus")){
    localStorage.setItem("ripando_plus", JSON.stringify(settings));
}

//localStorage['ripando_plus'] = settings;
function get_rp_storage(item)
{
    var rp_items = JSON.parse(localStorage['ripando_plus']) || settings;

    return rp_items[item] || null;
}

function set_rp_storage(item_key, item_value)
{
    var rp_items = JSON.parse(localStorage['ripando_plus']) || settings;

    rp_items[item_key] = item_value;

    localStorage['ripando_plus'] = JSON.stringify(rp_items);
}

// default configs to localStorage
function rp_check_storage()
{
    for (item in settings) {
        if (get_rp_storage(item) === null) {
            set_rp_storage(item, settings[item]);
        }
    }

    rp_restore_all();
}

// save configs to localStorage
function rp_save_all(items)
{   
    for (item in items) {
        set_rp_storage(item, settings[item]);
    }
}

// get configs from localStorage
function rp_restore_all()
{
    for (item in settings) {

        /*var checked_item;

        if (get_rp_storage(item) != null)
            checked_item = get_rp_storage(item);
        else 
            checked_item = settings[item];*/

        document.querySelector('#form_settings #'+item).checked = get_rp_storage(item);
    }
}

function rp_form_save_all()
{
    for (item in settings) {
        
        console.log('Form input: "#form_settings #'+item+'"');        
        var item_value = document.querySelector('#form_settings #'+item).checked;
        
        console.log('Form input value: "'+item_value+'"');        
        set_rp_storage(item, item_value);

    }
}

function rp_message(str_msg)
{
    document.querySelector('#status').innerHTML = str_msg;

    setTimeout(function(){ rp_message('') }, 2500);
}

// on loaded html
document.addEventListener('DOMContentLoaded', function(e){

    // check and define default settings
    //rp_check_storage();
    rp_restore_all();

    // on submit form save settings
    document.querySelector('#form_settings').addEventListener('onsubmit', function(){
        console.log('send :(');
        return false;    
    });

    document.querySelector('#save').addEventListener('click', function(){
        
        console.log('Save clicked');

        try {

            // jQuery required
            // get form items to save 
            //form_items = $('#form_settings').serialize();

            // save in localStorage
            //rp_save_all(form_items);

            // save items from form
            rp_form_save_all();

            // notify user
            rp_message('.O. Configurações salvas com sucesso!');

            console.log('Save configs.');

            console.log(localStorage.getItem("ripando_plus"));

            return false;

        } catch(err) {

            // notify user
            rp_message('.X. Ops! Erro ao salvar as configurações.');

            console.log('Error on save configs. Error Message: '+err);

            return false;

        }

        return false;

    });

});

/*
// Saves options to chrome.storage
function save() {
    var color = document.getElementById('color').value;
    var likesColor = document.getElementById('like').checked;
    chrome.storage.sync.set({
        favoriteColor: color,
        likesColor: likesColor
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
        status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        favoriteColor: 'red',
        likesColor: true
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        document.getElementById('like').checked = items.likesColor;
    });
}

    //document.addEventListener('DOMContentLoaded', restore_options); // error not callable
    //document.getElementById('save').addEventListener('click', save_options); // error not callable

$(function() {
    //load(); 
});*/