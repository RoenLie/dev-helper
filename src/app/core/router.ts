import { wrap } from "svelte-spa-router/wrap";
import Nav from "./layout/Nav.svelte";
import Nav2 from "./layout/Nav2.svelte";

export default {
    // exact path
    "/": wrap({
        asyncComponent: () => import("../routes/Home.svelte"),
        userData: { layout: Nav }
    }),
    // -----------------

    "/scripts": wrap({
        asyncComponent: () => import("../routes/Scripts.svelte"),
        userData: { layout: Nav }
    }),

    "/eyebuilder": wrap({
        asyncComponent: () => import("../routes/eyebuilder.page.svelte"),
        userData: { layout: Nav }
    }),

    "/settings": wrap({
        asyncComponent: () => import("../routes/settings.page.svelte"),
        userData: { layout: Nav }
    }),

    // -----------------
    // catch all
    "*": wrap({
        asyncComponent: () => import("../routes/NotFound.svelte"),
        userData: { layout: Nav2 }
    })
};