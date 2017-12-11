class Admin < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_attached_file :avatar, :styles => {:medium => "300x300>", :thumb => "35x35>" }, :default_url => "/img/no-user-image.jpg"
  validates_attachment :avatar,
                      :content_type => { :content_type => /^image\/(png|gif|jpeg|jpg)/, message: "must be in the format png|gif|jpg" },
                      :size => { :in => 0..1000.kilobytes, message: "must be less than 1MB" }
       
end
