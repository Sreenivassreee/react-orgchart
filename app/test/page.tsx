"use client";
import React, { useEffect } from "react";
import * as d3 from "d3";
import { OrgChart } from "d3-org-chart";
// import "d3-org-chart/dist/style.min.css";
import axios from "axios";
const data = [
  {
    name: "Sree",
    imageUrl:
      "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
    area: "Corporate",
    profileUrl: "http://example.com/employee/profile",
    office: "CTO office",
    tags: "Ceo,tag1,manager,cto",
    isLoggedUser: "false",
    positionName: "Chief Executive Officer",
    id: "O-6066",
    parentId: "",
    size: "",
  },
  {
    name: "Sree",
    imageUrl:
      "https://raw.githubusercontent.com/bumbeishvili/Assets/master/Projects/D3/Organization%20Chart/cto.jpg",
    area: "Corporate",
    profileUrl: "http://example.com/employee/profile",
    office: "CTO office",
    tags: "Ceo,tag1,manager,cto",
    isLoggedUser: "false",
    positionName: "Chief Executive Officer",
    id: "O-6065",
    parentId: "O-6066",
    size: "",
  },
];

const MyOrgChart: React.FC = () => {
  useEffect(() => {
    let chart: any;

    axios.get("api/employees").then((x) => {
      console.log(x);
    });

    d3.csv(
      "https://raw.githubusercontent.com/bumbeishvili/sample-data/main/org.csv"
    ).then((dataFlattened) => {
      chart = new OrgChart()
        .container(".chart-container")
        .data(dataFlattened)
        .nodeWidth((d: any) => 250)
        .initialZoom(0.7)
        .nodeHeight((d: any) => 175)
        .childrenMargin((d: any) => 40)
        .compactMarginBetween((d: any) => 15)
        .compactMarginPair((d: any) => 80)
        .nodeContent(function (d: any, i: number, arr: any, state: any) {
          return `
            <div style="padding-top:30px;background-color:none;margin-left:1px;height:${
              d.height
            }px;border-radius:2px;overflow:visible">
              <div style="height:${
                d.height - 32
              }px;padding-top:0px;background-color:white;border:1px solid lightgray;">

                <img src=" ${
                  d.data.imageUrl
                }" style="margin-top:-30px;margin-left:${d.width / 2 - 30}px;border-radius:100px;width:60px;height:60px;" />

               <div style="margin-right:10px;margin-top:15px;float:right">${
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
    });
  }, []);

  return (
    <div
      className="chart-container"
      style={{ height: "1200px", backgroundColor: "#f6f6f6" }}
    ></div>
  );
};

export default MyOrgChart;
