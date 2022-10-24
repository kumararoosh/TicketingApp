import { useRouter } from 'next/router'

import { usePerson } from '../../api';

const Post = () => {
    const router = useRouter();
    const { pid } = router.query

    const {data: people, error} = usePerson();

    if (error != null) return <div>Error loading todos...</div>;
    if (people == null) return <div>Loading...</div>;

    const allMatches = people.filter(p => p.id == pid)
    let name = "";
    if (allMatches.length > 0) {
        name = allMatches[0].name;
    }
    
    return <p>POST: {name}</p>
}

export default Post