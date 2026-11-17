<?php

require_api( 'authentication_api.php' );
require_api( 'form_api.php' );
require_api( 'gpc_api.php' );

auth_ensure_user_authenticated();
form_security_validate( 'plugin_ModoDaltonico_toggle' );

$f_active = gpc_get_string( 'active', '' );

$t_valid_values = array( 'on', 'off' );
if( !in_array( $f_active, $t_valid_values, true ) ) {
	form_security_purge( 'plugin_ModoDaltonico_toggle' );
	header( 'Content-Type: application/json; charset=utf-8' );
	echo json_encode( array( 'ok' => false, 'error' => 'invalid_value' ) );
	exit;
}

form_security_purge( 'plugin_ModoDaltonico_toggle' );

header( 'Content-Type: application/json; charset=utf-8' );
echo json_encode( array( 'ok' => true, 'active' => ( $f_active === 'on' ) ) );
exit;
