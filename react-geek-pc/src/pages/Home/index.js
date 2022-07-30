import Bar from "@/components/Bar"
import './index.scss'

const Home = () => {
    return (
        <div className="home">
            <Bar
                style={{ width: '500px', height: '400px' }}
                xData={['vue', 'angular', 'react']}
                sData={[50, 60, 70]}
                title='Three framework satisfaction' />

            <Bar
                style={{ width: '500px', height: '400px' }}
                xData={['vue', 'angular', 'react']}
                sData={[50, 60, 70]}
                title='Three major framework usage degrees' />
        </div>
    )
}

export default Home