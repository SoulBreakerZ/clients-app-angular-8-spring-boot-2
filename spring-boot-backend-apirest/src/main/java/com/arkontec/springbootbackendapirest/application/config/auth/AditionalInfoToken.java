package com.arkontec.springbootbackendapirest.application.config.auth;

import com.arkontec.springbootbackendapirest.data.entities.User;
import com.arkontec.springbootbackendapirest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.Map;
import static java.util.Map.entry;

@Component
public class AditionalInfoToken implements TokenEnhancer {

    @Autowired
    private UserService userService;

    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken accessToken, OAuth2Authentication authentication) {
        User user = userService.findByUsername(authentication.getName());
        Map<String,Object> info = Map.ofEntries(
                entry("aditional_info","Fuck you: ".concat(authentication.getName())),
                entry("username",user.getId()+": "+user.getUsername()),
                entry("name",user.getName()),
                entry("lastName",user.getLastName()),
                entry("email",user.getEmail())
        );
        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(info);
        return accessToken;
    }
}
