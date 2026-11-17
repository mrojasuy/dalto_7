<?php

class ModoDaltonicoPlugin extends MantisPlugin {

	public function register() {
		$this->name        = plugin_lang_get( 'name' );
		$this->description = plugin_lang_get( 'description' );
		$this->version     = '1.0.0';
		$this->requires    = array( 'MantisCore' => '2.0.0' );
		$this->author      = 'Equipo Accesibilidad';
		$this->contact     = 'soporte@ejemplo.com';
		$this->url         = 'https://ejemplo.com';
		$this->page        = 'config';
	}

	public function config() {
		return array(
			'enabled'       => 1,
			'contrast_type' => 'protanopia',
		);
	}

	public function events() {
		return array();
	}

	public function hooks() {
		return array(
			'EVENT_MENU_MAIN'       => 'menu_main',
			'EVENT_LAYOUT_RESOURCES' => 'layout_resources',
		);
	}

	public function menu_main( $p_event ) {
		$t_page = plugin_page( 'config' );
		$t_label = plugin_lang_get( 'configuracion' );
		return array( '<a href="' . string_attribute( $t_page ) . '">' . string_display( $t_label ) . '</a>' );
	}

	public function layout_resources( $p_event ) {
		$t_css_url = plugin_file( 'modoDaltonico.css' );
		$t_js_url  = plugin_file( 'modoDaltonico.js' );

		echo '<link rel="stylesheet" href="' . string_attribute( $t_css_url ) . '" />' . "\n";

		$t_enabled       = (int) plugin_config_get( 'enabled' );
		$t_contrast_type = plugin_config_get( 'contrast_type' );
		$t_toggle_url    = plugin_page( 'toggle' );

		$t_config = array(
			'initialActive' => ( $t_enabled === 1 ),
			'contrastType'  => $t_contrast_type,
			'toggleUrl'     => $t_toggle_url,
			'activeLabel'   => plugin_lang_get( 'modo_activo' ),
			'inactiveLabel' => plugin_lang_get( 'modo_inactivo' ),
			'strings'       => array(
				'protanopia'       => plugin_lang_get( 'protanopia' ),
				'deuteranopia'     => plugin_lang_get( 'deuteranopia' ),
				'tritanopia'       => plugin_lang_get( 'tritanopia' ),
				'indicador_activo' => plugin_lang_get( 'indicador_activo' ),
				'activar'          => plugin_lang_get( 'activar' ),
				'desactivar'       => plugin_lang_get( 'desactivar' ),
			),
		);

		echo '<script>window.ModoDaltonicoConfig = ' . json_encode( $t_config ) . ';</script>' . "\n";
		echo '<script src="' . string_attribute( $t_js_url ) . '"></script>' . "\n";
	}

	public function install() {
		return true;
	}

	public function uninstall() {
		// nothing to clean up
	}
}
