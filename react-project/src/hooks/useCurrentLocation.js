
import { useLocation } from 'react-router-dom';
export default function useCurrentLocation() {
    
    const location = useLocation();
    console.log(location);
    return location

}