// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.gson.Gson;
import java.util.ArrayList;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {

  DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    ArrayList<String> comments = new ArrayList<>();
    // Create a query instance with an entity type
    Query query = new Query("Comment").addSort("timestamp", SortDirection.DESCENDING);

    PreparedQuery results = datastore.prepare(query);

    for (Entity entity : results.asIterable()) {
        String comment = (String) entity.getProperty("userComment");
        comments.add(comment);
    }

    //Converting the comments list to JSON
    String jsonComments = convertToJsonUsingGson(comments);
    response.setContentType("application/json;");
    response.getWriter().println(jsonComments);
  }

  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get input from the form.
    String userComment = request.getParameter("user-comment");
    long timestamp = System.currentTimeMillis();

    // Create entities to store in datastore
    Entity commentEntity = new Entity("Comment");
    commentEntity.setProperty("userComment", userComment);
    commentEntity.setProperty("timestamp", timestamp);

    // Store the comments entity in the datastore.
    datastore.put(commentEntity);

    //Redirect back to the HTML page.
    response.sendRedirect("/index.html#comments");

  }

  private String convertToJsonUsingGson(ArrayList<String> list) {
    Gson gson = new Gson();
    String json = gson.toJson(list);
    return json;
  }
}
