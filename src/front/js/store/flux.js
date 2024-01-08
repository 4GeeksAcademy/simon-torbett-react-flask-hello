import {
    Register
} from "../pages/register";

const getState = ({
    getStore,
    getActions,
    setStore
}) => {
    return {
        store: {
            token: null,
        },
        actions: {
            register: async (email, password) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                };

                try {
                    const resp = await fetch(
                        "https://3001-spaganodova-reactflaskh-27xaudxerdk.ws-eu96.gitpod.io/api/register",
                        options
                    );

                    if (resp.status !== 200) {

                        alert("An error has occurred while creating the user");
                        return false;
                    }

                    const data = await resp.json();
                    console.log(data);
                    return true;
                } catch (error) {
                    console.error("error");
                    console.log(error);
                }
            },

            login: async (email, password) => {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                    }),
                };

                try {
                    const resp = await fetch(
                        "https://3001-spaganodova-reactflaskh-27xaudxerdk.ws-eu96.gitpod.io/api/login",
                        options
                    );
                    console.log(options.headers)
                    if (resp.status !== 200) {

                        alert("no ingreso");
                        return false;
                    }

                    const data = await resp.json();
                    localStorage.setItem("token", data.access_token.token);
                    setStore({
                        token: data.access_token.token,

                    });
                    return true;

                } catch (error) {
                    console.log(error);
                }
            },

            syncToken: () => {
                const token = localStorage.getItem("token");
                if (token && token != "" && token != undefined)
                    setStore({
                        token: token,
                    });
            },
        }
    };
};

export default getState;