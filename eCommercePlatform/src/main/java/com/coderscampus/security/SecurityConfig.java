package com.coderscampus.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter 
{
  @Autowired
  private UserDetailsService userDetailsService;
  
  @Autowired
  public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception 
  {
    auth.userDetailsService(userDetailsService);
  }
  
  @Override
  protected void configure(HttpSecurity http) throws Exception 
  {
    http
    .csrf().disable()
    .authorizeRequests()
      .antMatchers("/dashboard").hasAnyRole("DASHBOARD")
//      .antMatchers("/dashboard").hasAnyAuthority("ROLE_DASHBOARD")
      .antMatchers("/register").permitAll()
      .anyRequest().authenticated()
      .and()
    .formLogin()
      .loginPage("/login")
      .defaultSuccessUrl("/dashboard")
      .permitAll();
  }
}
