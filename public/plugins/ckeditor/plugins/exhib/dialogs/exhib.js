CKEDITOR.dialog.add( 'exhibDialog', function( editor ) {
    return {
        title: 'Вставка кнопки выставки',
        minWidth: 400,
        minHeight: 200,

				   contents: [
				{
					id: 'tab-basic',
					label: 'Настройки кнопки',
					elements: [
						{
							type: 'text',
							id: 'btn_text',
							label: 'Текст на кнопке',
							validate: CKEDITOR.dialog.validate.notEmpty( "Текст field cannot be empty." )
						},					
						{
							type: 'text',
							id: 'id',
							label: 'Exhibition ID',
							validate: CKEDITOR.dialog.validate.notEmpty( "ID field cannot be empty." )
						}
					]
				}				
			],
		 onOk: function() {
				var dialog = this;

				var abbr = editor.document.createElement( 'button' );
				abbr.setAttribute( 'exhib_id', dialog.getValueOf( 'tab-basic', 'id' ) );
			    abbr.setAttribute( 'class', 'go_exhib' );
				abbr.setAttribute( 'class', 'btn btn-default' );
				abbr.setText( dialog.getValueOf( 'tab-basic', 'btn_text' ) );

				
				editor.insertElement( abbr );
			}	


    };
});