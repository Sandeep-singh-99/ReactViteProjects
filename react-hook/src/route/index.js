import Hook1 from '../screen/Hook1';
import Hook2 from '../screen/Hook2';

const {createBrowserRouter} = require('react-router-dom');
const { default: App } = require('../App');
const { default: Home } = require('../screen/Home');
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/useState",
                element: <Hook1/>
            },
            {
                path: "/useEffect",
                element: <Hook2/>
            }
        ]
    }
]);

export default router;