define("zz/ui/plugins/state",["jquery/jquery/1.7.2/jquery"],function(a){"use strict";var b=a("jquery/jquery/1.7.2/jquery");b.fn.extend({toggleState:function(a){return this.data("state-"+a)?(this.data("state-"+state,!1),!0):(this.data("state-"+state,!0),!1)},isState:function(a){return this.data("state-"+a)?!0:!1},setState:function(a){this.data("state-"+a,!0)},unState:function(a){this.data("state-"+a,!1)}})});