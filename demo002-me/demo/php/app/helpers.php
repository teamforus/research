<?php

if (!function_exists('isMobile')) {
    function isMobile() {
        return preg_match("/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i", $_SERVER["HTTP_USER_AGENT"]);
    }
}

if(!function_exists('pretty_date')) {
    function pretty_date($time = FALSE) {
        // default value
        if (!$time)
            $time = time();
        // convert string to timestamp then input is string
        if (!is_numeric($time))
            $time = strtotime($time);
        // format and return
        return date('M d, Y', $time);
    }
}
if(!function_exists('pretty_datetime')) {
    function pretty_datetime($time = FALSE) {
        // default value
        if (!$time)
            $time = time();
        // convert string to timestamp then input is string
        if (!is_numeric($time))
            $time = strtotime($time);
        // format and return
        return date('M d, Y H:i', $time);
    }
}