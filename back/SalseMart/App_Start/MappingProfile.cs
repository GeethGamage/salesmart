using AutoMapper;
using SalseMart.Dtos;
using SalseMart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SalseMart.App_Start
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            Mapper.CreateMap<Stock, StockDto>();
            Mapper.CreateMap<StockDto, Stock>();
        }
    }
}