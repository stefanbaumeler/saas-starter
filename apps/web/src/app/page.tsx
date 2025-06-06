import { Home } from '@/components/Home'
import { urqlClient } from '@/gql/urql'
import { QExampleDocument, TQExample } from '@saas-starter/schema/web'

const HomePage = async () => {
    const {
        data, error
    } = await urqlClient.query<TQExample>(QExampleDocument, {})

    console.log(data, error)

    return <Home />
}

export default HomePage
