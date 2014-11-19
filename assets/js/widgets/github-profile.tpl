<script type="text/template">
    <div id="github-widget" data-username="<%= user.login %>" class="gh-profile-widget">

        <div class="profile">
            <img src="<%= user.avatar_url %>" class="avatar">
            <a href="<%= user.html_url %>" class="name"><%= user.name %></a>

            <div class="followMe">
                <a href="<%= user.html_url %>" class="follow-button">Follow @<%= user.login %></a>
                <span class="followers"><%= user.followers %></span>
            </div>
        </div>
        <table class="languages-list">
            <tr>
                <th>Language</th>
                <th align="right">Lines of code written</th>
            </tr>
            <% $.each(topLanguages, function(i, o){ %>
            <tr>
                <td><%= o[0] %></td>
                <td align="right"><small><%= o[1] %></small></td>
            </tr>
            <% }); %>
        </table>
        <div class="repos">
            <span class="header">Most starred repositories</span>
            <% $.each(topRepos, function(i, o){ %>
            <a href="<%= o.html_url %>" title="<%= o.description %>">
                <span class="repo-name"><%= o.name %></span><span class="updated">Updated: <%= o.updated_at %></span><span class="star"><%= o.stargazers_count %></span>
            </a>
            <% }); %>
        </div>
    </div>
</script>
