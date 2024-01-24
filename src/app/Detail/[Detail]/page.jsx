 

import DataFetch from "./dataFetch";


export const dynamic = 'force-dynamic'

const Detail = ({ params }) => { 

    return (
        <DataFetch param={params.Detail} />
    )
}




export default Detail;
