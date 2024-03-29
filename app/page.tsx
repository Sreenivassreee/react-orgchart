"use client";
import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";
// import "d3-org-chart/dist/style.min.css";
import axios from "axios";
import { IEmployee } from "@/models/Employee";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { CustomForm } from "../components/own/form";

// const data = [
//   {
//     name: "Sree",
//     imageUrl:
//       "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
//     area: "Corporate",
//     profileUrl: "http://example.com/employee/profile",
//     office: "CTO office",
//     tags: "Ceo,tag1,manager,cto",
//     isLoggedUser: "false",
//     positionName: "Chief Executive Officer",
//     id: "O-6066",
//     parentId: "",
//     size: "",
//   },
//   {
//     name: "Sree",
//     imageUrl:
//       "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
//     area: "Corporate",
//     profileUrl: "http://example.com/employee/profile",
//     office: "CTO office",
//     tags: "Ceo,tag1,manager,cto",
//     isLoggedUser: "false",
//     positionName: "Chief Executive Officer",
//     id: "O-6065",
//     parentId: "O-6066",
//     size: "",
//   },
// ];

// const Home = () => {
//   axios
//     .post("api/employees", {
//       name: "Sree",
//       imageUrl:
//         "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
//       area: "Corporate",
//       profileUrl: "http://example.com/employee/profile",
//       office: "CTO office",
//       tags: "Ceo,tag1,manager,cto",
//       isLoggedUser: "false",
//       positionName: "Chief Executive Officer",
//       id: "O-6066",
//       parentId: "",
//       size: "",
//     })
//     .then((x) => {
//       console.log(x);
//     });
// };

const Home = () => {
  const [allData, setAllData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersonData, setSelectedPersonData] = useState<
    IEmployee | undefined
  >();
  const [selectedId, setSelectedId] = useState();

  useEffect(() => {
    console.log("-----------------------");
    let chart: any;
    axios.get("api/employees").then((response) => {
      const tempData = response.data;
      chart = new OrgChart()
        .container(".chart-container")
        .data(tempData)
        .nodeWidth((d: any) => 250)
        .initialZoom(0.7)
        .nodeHeight((d: any) => 175)
        .childrenMargin((d: any) => 40)
        .compactMarginBetween((d: any) => 15)
        .compactMarginPair((d: any) => 80)
        .nodeContent(function (d: any, i: number, arr: any, state: any) {
          (window as any).handleChartClick = (tData: any) => {
            setSelectedId(tData);
            setIsOpen(true);
          };

          return `
            <div id="person-card" value=${
              d.data.id
            } onclick="handleChartClick('${d.data.id}')" style="padding-top:30px;background-color:none;margin-left:1px;height:${d.height}px;border-radius:2px;overflow:visible">
              <div style="height:${
                d.height - 32
              }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

                <img src=" ${
                  d.data.imageUrl
                }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />
               <div  style="margin-right:10px;margin-top:15px;float:right">${
                 d.data.id
               }</div>
               
               <div style="margin-top:-30px;background-color:#3AB6E3;height:10px;width:${
                 d.width - 2
               }px;border-radius:1px"></div>

               <div style="padding:20px; padding-top:35px;text-align:center">
                   <div style="color:#111672;font-size:16px;font-weight:bold"> ${
                     d.data.name
                   } </div>
                   <div style="color:#404040;font-size:16px;margin-top:4px"> ${
                     d.data.positionName
                   } </div>
               </div> 
               <div style="display:flex;justify-content:space-between;padding-left:15px;padding-right:15px;">
                 <div > Manages:  ${d.data._directSubordinates} 👤</div>  
                 <div > Oversees: ${d.data._totalSubordinates} 👤</div>    
               </div>
              </div>    
      
      </div>
      
  `;
        })
        .render();
      setAllData(tempData);
    });
  }, []);

  useEffect(() => {
    console.log(selectedId);
    const personData = allData?.find(
      (person: IEmployee) => person.id === selectedId
    );

    setSelectedPersonData(personData);
  }, [selectedId, allData]);

  // const clickedOnCard = (id: any) => {
  //   // console.log(id);
  //   setIsOpen(true);

  //   const personData = [
  //     ...(allData?.find((person: IEmployee) => person.id === id) ?? []),
  //   ];
  //   console.log(personData, "-----personData-----");

  // };

  return (
    <>
      <div
        // onClick={(e) => clickedOnCard(e)}
        className="chart-container"
        style={{ height: "1200px", backgroundColor: "#f6f6f6" }}
      ></div>
      <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedPersonData?.name}</DrawerTitle>
            <CustomForm
              selectedPersonData={selectedPersonData}
              oonClose={() => {
                setSelectedPersonData(undefined);
                setIsOpen(false);
              }}
              oonSubmit={(data: any) => {
                console.log("dtat", data);
              }}
            />
          </DrawerHeader>
          <DrawerFooter>
            {/* <Button
              onClick={() => {
                setSelectedPersonData(undefined);
                setIsOpen(false);
              }}
            >
              Submit
            </Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Home;
