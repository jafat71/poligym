import { Href } from "expo-router";

type RouteMapping = Record<string, Href<string | object>>

const useRouteMappinginitForm = () => {
  
  const routeMapping: RouteMapping = {
    '/form01': '/form02',
    '/form02': '/form03',
    '/form03': '/form04',
    '/form04': '/form05',
    '/form05': '/form06',
    '/form06': '/(root)/(tabs)/home',
  };

    return {
        routeMapping
  }
}

export default useRouteMappinginitForm