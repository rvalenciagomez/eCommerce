package com.coderscampus.service;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.util.StringUtils;

public class SaveHelperService 
{
  // if we think about this method in a specific way , lets sub in "Product" every time we see "T"
//public static Product save(JpaRepository<Procut, Long>, Product obj, Class<Product> clazz,.... ) 
  public static <T> T save (JpaRepository<T,Long> repo, T obj, Class<T> clazz, String fieldName, String fieldValue) throws NoSuchMethodException, SecurityException, IllegalAccessException, IllegalArgumentException, InvocationTargetException
  {
//    product.setImageUrl(imageUrl);
//        
//we need to capitalize the first letter to properly invoke the setter method
    fieldName = StringUtils.capitalize(fieldName);
    
    Method[] methods = clazz.getMethods();
    Method method = null;
    
    for(Method aMethod : methods)
    {
      if(aMethod.getName().equals("set"+fieldName))
        {
        method = aMethod;
        if(method.getParameterTypes()[0].getName().indexOf("String") > -1)
          {
            //We know that this setter mehtod sets a string
            method.invoke(obj, fieldValue);
          }
        else if(method.getParameterTypes()[0].getName().indexOf("Double") > -1) 
          {
            fieldValue = fieldValue.replace("$","");
            
            method.invoke(obj, Double.valueOf(fieldValue));
          }
        break;
        }
    }
    
    return repo.save(obj);
    
  }
}
