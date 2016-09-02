package com.coderscampus.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.coderscampus.domain.Product;
import com.coderscampus.domain.User;
import com.coderscampus.repository.ProductRepository;

@Controller
public class DashboardController
{
	
  private ProductRepository productRepo;
  
  @RequestMapping("/")
  public String rootPath ()
  {
    return "redirect:/dashboard";
  }
  
  @RequestMapping(value="/dashboard", method=RequestMethod.GET)
  public String dashboardGet (ModelMap model, @AuthenticationPrincipal User user)
  {
    List<Product> products = productRepo.findByUser(user);
    
    model.put("productList", products);
    
    return "dashboard";
  }

  @Autowired
  public void setProductRepo(ProductRepository productRepo) {
    this.productRepo = productRepo;
  }
  
  
}
