package com.github.youssefwadie.roombooking.model.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.github.youssefwadie.roombooking.model.Layout;

@Entity
@Table(name = "layouts")
public class LayoutCapacity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private Layout layout;
	private Integer capacity;

	public LayoutCapacity() {
	}

	public LayoutCapacity(Layout layout, Integer capacity) {
		this.layout = layout;
		this.capacity = capacity;
	}

	public Layout getLayout() {
		return layout;
	}

	public void setLayout(Layout layout) {
		this.layout = layout;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}
}
