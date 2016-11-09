class VipUsersController < ApplicationController
  require 'date'
  Date::DAYNAMES[Date.today.wday] == 'Sunday'

  def index
    render json: VipUser.all.order(:created_at)
  end

  def vip_users
    @vip_users = VipUser.all
    render 'vip_users'
  end

  def guest_count
    @guest_count = [];
  end

  def new

  end

  def create
    vip_user = VipUser.create(user_params)
    render json: vip_user
  end

  def edit

  end

  def update
    vip_user = VipUser.find(params[:id])
    item.update(user_params)
    render json: vip_user
  end

  def destroy
    VipUser.find(params[:id]).destroy
    head :ok
  end


  private
    def user_params
      params.require(:vip_user).permit(:first_name, :last_name, :email, :phone_number, :college, :party, :questions )
    end


end
