var FieldSet = {
    init: function(){
        $('form').on('click', '.remove_fields', function(event){
            event.preventDefault()
            console.log('Fuck')
            $(this).prev('input[type=hidden]').val('1')
            $(this).closest('fieldset').hide()
        })

        $('form').on('click', '.add_fields', function(event){
            event.preventDefault()
            time = new Date().getTime()
            regexp = new RegExp($(this).data('id'), 'g')
            $(this).before($(this).data('fields').replace(regexp, time))
            event.preventDefault()
            console.log('Fuck')
        })
    }
}

$(document).on('page:load', FieldSet.init)
$(document).on('turbolinks:load', FieldSet.init)