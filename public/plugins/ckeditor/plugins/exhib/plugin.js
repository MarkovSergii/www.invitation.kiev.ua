CKEDITOR.plugins.add( 'exhib', {
  //  icons: 'exhib',
    init: function( editor ) {
        // Plugin logic goes here...
		editor.addCommand( 'exhib', new CKEDITOR.dialogCommand( 'exhibDialog' ) );
		editor.ui.addButton( 'ExhibID', {
				label: 'Insert Exhibition ID',
				icon: this.path + 'exhib.png',
				command: 'exhib',
			//	icon: this.path + 'icons/exhib.png'
				toolbar: 'insert'
			});
		CKEDITOR.dialog.add( 'exhibDialog', this.path + 'dialogs/exhib.js' );	
    }
});