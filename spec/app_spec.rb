require File.expand_path '../spec_helper.rb', __FILE__

describe "My Page" do
  it "greets the visitor" do
    visit "/"
    expect(page).to have_content "Welcome to my page!"
  end

  it "takes in a HEX value" do
    visit "/"
    expect(find('input')['']).to equal "Have a pizza!"
  end
end
