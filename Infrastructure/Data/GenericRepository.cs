using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class GenericRepository<T>: IGenericRepository<T> where T : BaseEntity
    {
        public Task<T> GetByIdAsync(int id)
        {
            throw new System.NotImplementedException();
        }
        
        
        public Task<IReadOnlyList<T>> ListAllAsync()
        {
            throw new System.NotImplementedException(); 
        }
    }
}