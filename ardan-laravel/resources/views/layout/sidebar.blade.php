<!--  BEGIN SIDEBAR  -->
<div class="sidebar-wrapper sidebar-theme">
  <nav id="sidebar">
      <div class="navbar-nav theme-brand flex-row  text-center">
          <div class="nav-logo">
              <div class="nav-item theme-logo">
                  <a href="./index.html">
                      <img src="/resources/assets/img/ardan/logo.png" class="navbar-logo-new" alt="logo">
                  </a>
              </div>
              <div class="nav-item theme-text">
                  <a href="./index.html" class="nav-link"> Ardan </a>
              </div>
          </div>
          <div class="nav-item sidebar-toggle">
              <div class="btn-toggle sidebarCollapse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevrons-left"><polyline points="11 17 6 12 11 7"></polyline><polyline points="18 17 13 12 18 7"></polyline></svg>
              </div>
          </div>
      </div>
      <div class="shadow-bottom"></div>
      <ul class="list-unstyled menu-categories" id="accordionExample">
          @foreach($menu as $menu)
          <li class="menu @if($menu->type == 'heading') menu-heading @endif @if(Request::url() === url($menu->target)) active @endif">
              @if($menu->type != 'heading')
              <a href="@if(count($menu->children) > 0) #{{ $menu->id }} @else {{ $menu->target }} @endif" 
                @if(count($menu->children) > 0)
                data-bs-toggle="collapse" aria-expanded="true"
                @else
                aria-expanded="false" 
                @endif
                class="dropdown-toggle"
              >
              @endif
                  <div class="@if($menu->type == 'heading') heading @endif">
                      {!! $menu->icon !!}
                      <span>{{ $menu->label }}</span>
                  </div>
                  @if(count($menu->children) > 0)
                  <div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </div>
                  @endif
              @if($menu->type != 'heading')
              </a>
              @endif
              @if(count($menu->children) > 0)
              <ul class="collapse submenu list-unstyled show" id="{{ $menu->id }}" data-bs-parent="#accordionExample">
                  @foreach($menu->children as $menu_child)
                  <li class="@if(Request::url() === $menu->target) active @endif">
                      <a href="{{ $menu_child->target }}"> {{ $menu_child->label }} </a>
                  </li>
                  @endforeach
              </ul>
              @endif
          </li>
          @endforeach
      </ul>
  </nav>
</div>
<!--  END SIDEBAR  -->