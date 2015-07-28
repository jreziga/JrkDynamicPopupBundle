<?php

namespace Jrk\DynamicPopupBundle\Twig\Extension;

use Doctrine\ORM\EntityManager;

class TemplateExtension extends \Twig_Extension {

    private $router;


    public function __construct($router) {
        $this->router = $router;
    }

    /**
     * Returns a list of functions to add to the existing list.
     *
     * @return array An array of functions
     */
    public function getFunctions() {
        return array(
            new \Twig_SimpleFunction('dynamic_popup_template', array($this, 'dynamicPopupTemplate'), array('is_safe' => array('html'), 'needs_environment' => true)),
            new \Twig_SimpleFunction('dynamic_popup_javascripts', array($this, 'dynamicPopupJs'), array('is_safe' => array('html'), 'needs_environment' => true)),
            new \Twig_SimpleFunction('dynamic_popup_styles', array($this, 'dynamicPopupCss'), array('is_safe' => array('html'), 'needs_environment' => true))
        );
    }


    public function dynamicPopupTemplate(\Twig_Environment $twig, $opts) {
        return $twig->render('JrkDynamicPopupBundle:popup:template.html.twig', array(
            'data' => $opts
        ));
    }

    public function dynamicPopupJs(\Twig_Environment $twig, $opts = null) {
        return $twig->render('JrkDynamicPopupBundle:assets:javascripts.html.twig', array(
        ));
    }

    public function dynamicPopupCss(\Twig_Environment $twig, $opts = null) {
        return $twig->render('JrkDynamicPopupBundle:assets:styles.html.twig', array(
        ));
    }

    /**
     * Returns the name of the extension.
     *
     * @return string The extension name
     */
    public function getName() {
        return 'jrk_dynamic_popup.templating_extension';
    }

}
