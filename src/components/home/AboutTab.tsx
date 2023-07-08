// import { Tabs } from 'antd';
import React from 'react';
import ForBrandsTab from './TabContent';
import Container from '../ui/container';



const onChange = (key: string) => {
  console.log(key);
};

const AboutTab: React.FC = () => {

  return (
    <Container>
      <div className='xl:container mx-auto my-20'>
        {/* <Tabs defaultActiveKey="1" onChange={onChange} type='card' centered>
          <TabPane tab="Брэндийн хувьд" key="1">
            <ForBrandsTab tabContents={about1} />
          </TabPane>
          <TabPane tab="Mэргэжилтнүүдийн хувьд" key="2">
            <ForBrandsTab tabContents={about1} />
          </TabPane>
        </Tabs> */}
      </div>
    </Container >

  )

};

export default AboutTab;