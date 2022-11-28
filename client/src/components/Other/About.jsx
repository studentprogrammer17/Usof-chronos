import kostya from '../../assets/about page/photo_2022-09-17_20-05-23.jpg';
import artem from '../../assets/about page/artem.jpg';
import dima from '../../assets/about page/dima.jpg';

const About = () => {
    return (
        <>
        <div className="form-background">
            <div className="form-background p-3">
            <h1 className='text-white text-center'>ГЕНІЇ НА РОЗРОБНИКАХ</h1>
            </div>
            <div className="form-background p-5 d-flex justify-content-around">
                <div id='kostya' className='c bg-dark text-white rounded d-flex flex-column p-3 justify-content-center w-25'>
                    <div className='d-flex flex-column  align-items-center'>
                        <h1 className="text-center">Kostya</h1>
                        <img src={kostya} height={200} alt="kostya" />
                    </div>
                    <div>
                        <p>Жоскій фронтендер, відповідальний за весь візуал цього неймовірного сайту. 
                        Також украінізував всі модулі, які були використані для розробки. <a href="https://t.me/kossyaak" className='link-info'>Дівчата, пишіть</a> </p>
                    </div>
                </div>
                <div id='artem' className=' bg-dark text-white rounded d-flex flex-column p-3 justify-content-center  w-25'>
                    <div  className='d-flex flex-column  align-items-center'>
                        <h1 className="text-center">Artem</h1>
                        <img src={artem} height={200} alt="artem" />
                    </div>
                    <div>
                        <p>Це бекендер, тут по фотографії все ясно. Займався розробкою бази даних, та написанням серверу. Неймовірні tripple INNER JOIN шариш, бот? <a href="https://t.me/bndr_artem" className='link-info'>Кароче хлопчики, пишіть</a></p>
                    </div>

                </div>
                <div id='dima' className=' bg-dark text-white rounded d-flex flex-column p-3 justify-content-center  w-25'>
                    <div  className='d-flex flex-column  align-items-center'>
                        <h1 className="text-center">Dima</h1>
                        <img src={dima} height={200} alt="dima" />
                    </div>
                    <div>
                        <p>
                            Теж фронтендер, займався розробкою календаря, додаванням до нього івентів і тощо. <a href="https://t.me/CaesarDmitriy" className='link-info'>На фото я (шарю)</a>
                        </p>
                    </div>
                </div>

            </div>
            </div>
        </>
    )
}


export default About;