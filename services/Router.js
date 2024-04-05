const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((link) => {
            link.addEventListener("click", (event) => {
                event.preventDefault();
                const target = event.target;
                const url = target.getAttribute("href");
                Router.go(url);
            });
        });
		window.addEventListener('popstate', event => {
			if (event.state?.route) {
				Router.go(event.state.route, false);
			} else {
				Router.go('/order');
			}
		});

        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {

		if (addToHistory) {
            history.pushState({ route }, "", route);
        }
        let pageElement = null;
        switch (route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order":
                pageElement = document.createElement("order-page");
			default: 
				if (route.startsWith('/product-')) {
					pageElement = document.createElement("details-page");
					const paramId = route.substring(route.lastIndexOf('-') + 1);
					pageElement.dataset.productId = paramId;
				}
        }
        if (pageElement) {
            const cache = document.querySelector("main");
            cache.innerHTML = "";
            cache.appendChild(pageElement);
			window.scrollX = 0;
			window.scrollY = 0;
        } else {
			document.querySelector("main").innerHTML = 'Ops, 404';
		}
    },
};

export default Router;
